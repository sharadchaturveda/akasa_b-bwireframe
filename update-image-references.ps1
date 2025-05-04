# Define path mappings - old path to new path
$pathMappings = @(
    # Brand images
    @{ OldPath = "/images/brand/akasa-logo.svg"; NewPath = "/images/brand/logo.svg" },
    
    # Home page images
    @{ OldPath = "/images/home/hero.jpg"; NewPath = "/images/home/hero/hero-home.jpg" },
    @{ OldPath = "/images/home/philosophy-bg.jpg"; NewPath = "/images/home/philosophy/background.jpg" },
    @{ OldPath = "/images/home/drink.jpg"; NewPath = "/images/home/philosophy/drink.jpg" },
    @{ OldPath = "/images/home/whats-happening.jpg"; NewPath = "/images/home/whats-happening/main.jpg" },
    @{ OldPath = "/images/home/whats-happening-bg.jpg"; NewPath = "/images/home/whats-happening/background.jpg" },
    @{ OldPath = "/images/home/testimonial.jpg"; NewPath = "/images/home/testimonials/background.jpg" },
    @{ OldPath = "/images/home/awards.jpg"; NewPath = "/images/home/gallery/awards.jpg" },
    @{ OldPath = "/images/home/location.jpg"; NewPath = "/images/home/gallery/location.jpg" },
    
    # Menu page images
    @{ OldPath = "/images/menu/chef-portrait.jpg"; NewPath = "/images/menu/chef/portrait.jpg" },
    @{ OldPath = "/images/menu/chef.jpg"; NewPath = "/images/menu/chef/background.jpg" },
    @{ OldPath = "/images/menu/gallery1.jpg"; NewPath = "/images/menu/hero/gallery-1.jpg" },
    @{ OldPath = "/images/menu/gallery2.jpg"; NewPath = "/images/menu/hero/gallery-2.jpg" },
    @{ OldPath = "/images/menu/gallery3.jpg"; NewPath = "/images/menu/hero/gallery-3.jpg" },
    @{ OldPath = "/images/menu/gallery5.jpg"; NewPath = "/images/menu/hero/gallery-5.jpg" },
    @{ OldPath = "/images/menu/gallery6.jpg"; NewPath = "/images/menu/hero/gallery-6.jpg" },
    
    # A La Carte menu images
    @{ OldPath = "/images/menu/a-la-carte/hero-a-la-carte.jpg"; NewPath = "/images/menu/a-la-carte/hero/hero.jpg" },
    
    # Bar Bites menu images
    @{ OldPath = "/images/menu/bar-bites/hero-bar-bites.jpg"; NewPath = "/images/menu/bar-bites/hero/hero.jpg" },
    @{ OldPath = "/images/menu/hero-bar-bites.jpg"; NewPath = "/images/menu/bar-bites/hero/hero-alt.jpg" },
    
    # Drinks menu images
    @{ OldPath = "/images/menu/drinks/hero-drinks.jpg"; NewPath = "/images/menu/drinks/hero/hero.jpg" },
    
    # Set Lunch menu images
    @{ OldPath = "/images/menu/set-lunch/hero-set-lunch.jpg"; NewPath = "/images/menu/set-lunch/hero/hero.jpg" },
    
    # Soul Food Weekends menu images
    @{ OldPath = "/images/menu/soul-food-weekends/hero-soul-food-weekends.jpg"; NewPath = "/images/menu/soul-food-weekends/hero/hero.jpg" },
    
    # Events page images
    @{ OldPath = "/images/events/event3.jpg"; NewPath = "/images/events/hero/hero.jpg" },
    @{ OldPath = "/images/events/gallery4.jpg"; NewPath = "/images/events/listings/event-1.jpg" },
    @{ OldPath = "/images/unused/gallery1.jpg"; NewPath = "/images/events/listings/event-2.jpg" },
    @{ OldPath = "/images/unused/gallery3.jpg"; NewPath = "/images/events/listings/event-3.jpg" },
    
    # Offers page images
    @{ OldPath = "/images/offers/gallery5.jpg"; NewPath = "/images/offers/hero/hero.jpg" },
    @{ OldPath = "/images/offers/gallery1.jpg"; NewPath = "/images/offers/promotions/weekday-lunch.jpg" },
    @{ OldPath = "/images/menu/gallery2.jpg"; NewPath = "/images/offers/promotions/anniversary.jpg" },
    
    # Reservations page images
    @{ OldPath = "/images/reservations/gallery3.jpg"; NewPath = "/images/reservations/hero/hero.jpg" },
    
    # Testimonials images
    @{ OldPath = "/images/testimonials/avatar1.jpg"; NewPath = "/images/home/testimonials/avatar-1.jpg" },
    @{ OldPath = "/images/testimonials/avatar2.jpg"; NewPath = "/images/home/testimonials/avatar-2.jpg" },
    @{ OldPath = "/images/testimonials/avatar3.jpg"; NewPath = "/images/home/testimonials/avatar-3.jpg" },
    @{ OldPath = "/images/testimonials/testimonial-bg.jpg"; NewPath = "/images/home/testimonials/background-alt.jpg" },
    
    # Common images
    @{ OldPath = "/images/common/footer-bg.jpg"; NewPath = "/images/common/footer-background.jpg" }
)

# Get all TypeScript and CSS files
$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx", "*.ts", "*.css", "*.scss" | Where-Object { -not $_.PSIsContainer }

# Process each file
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    $modified = $false
    
    # Apply each path mapping
    foreach ($mapping in $pathMappings) {
        $oldPath = $mapping.OldPath
        $newPath = $mapping.NewPath
        
        if ($content -match [regex]::Escape($oldPath)) {
            $content = $content -replace [regex]::Escape($oldPath), $newPath
            $modified = $true
        }
    }
    
    # Save the file if it was modified
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated: $($file.FullName)"
    }
}

# Also update CSS background-image URLs
$cssFiles = Get-ChildItem -Path "src", "public" -Recurse -Include "*.css", "*.scss" | Where-Object { -not $_.PSIsContainer }

foreach ($file in $cssFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    $modified = $false
    
    # Apply each path mapping for background-image URLs
    foreach ($mapping in $pathMappings) {
        $oldPath = $mapping.OldPath
        $newPath = $mapping.NewPath
        
        # Match background-image: url('/images/...')
        $pattern = "background-image:\s*url\(['""]" + [regex]::Escape($oldPath) + "['""]"
        $replacement = "background-image: url('$newPath'"
        
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $replacement
            $modified = $true
        }
        
        # Match background: url('/images/...')
        $pattern = "background:\s*url\(['""]" + [regex]::Escape($oldPath) + "['""]"
        $replacement = "background: url('$newPath'"
        
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $replacement
            $modified = $true
        }
        
        # Match background-[url('/images/...')]
        $pattern = "background-\[url\(['""]" + [regex]::Escape($oldPath) + "['""]"
        $replacement = "background-[url('$newPath'"
        
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $replacement
            $modified = $true
        }
    }
    
    # Save the file if it was modified
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated CSS: $($file.FullName)"
    }
}
