# Define image mappings - source to destination
$imageMappings = @(
    # Brand images
    @{ Source = "public\images\brand\akasa-logo.svg"; Destination = "public\images\brand\logo.svg" },
    
    # Home page images
    @{ Source = "public\images\home\hero.jpg"; Destination = "public\images\home\hero\hero-home.jpg" },
    @{ Source = "public\images\home\philosophy-bg.jpg"; Destination = "public\images\home\philosophy\background.jpg" },
    @{ Source = "public\images\home\drink.jpg"; Destination = "public\images\home\philosophy\drink.jpg" },
    @{ Source = "public\images\home\whats-happening.jpg"; Destination = "public\images\home\whats-happening\main.jpg" },
    @{ Source = "public\images\home\whats-happening-bg.jpg"; Destination = "public\images\home\whats-happening\background.jpg" },
    @{ Source = "public\images\home\testimonial.jpg"; Destination = "public\images\home\testimonials\background.jpg" },
    @{ Source = "public\images\home\awards.jpg"; Destination = "public\images\home\gallery\awards.jpg" },
    @{ Source = "public\images\home\location.jpg"; Destination = "public\images\home\gallery\location.jpg" },
    
    # Menu page images
    @{ Source = "public\images\menu\chef-portrait.jpg"; Destination = "public\images\menu\chef\portrait.jpg" },
    @{ Source = "public\images\menu\chef.jpg"; Destination = "public\images\menu\chef\background.jpg" },
    @{ Source = "public\images\menu\gallery1.jpg"; Destination = "public\images\menu\hero\gallery-1.jpg" },
    @{ Source = "public\images\menu\gallery2.jpg"; Destination = "public\images\menu\hero\gallery-2.jpg" },
    @{ Source = "public\images\menu\gallery3.jpg"; Destination = "public\images\menu\hero\gallery-3.jpg" },
    @{ Source = "public\images\menu\gallery5.jpg"; Destination = "public\images\menu\hero\gallery-5.jpg" },
    @{ Source = "public\images\menu\gallery6.jpg"; Destination = "public\images\menu\hero\gallery-6.jpg" },
    
    # A La Carte menu images
    @{ Source = "public\images\menu\a-la-carte\hero-a-la-carte.jpg"; Destination = "public\images\menu\a-la-carte\hero\hero.jpg" },
    
    # Bar Bites menu images
    @{ Source = "public\images\menu\bar-bites\hero-bar-bites.jpg"; Destination = "public\images\menu\bar-bites\hero\hero.jpg" },
    @{ Source = "public\images\menu\hero-bar-bites.jpg"; Destination = "public\images\menu\bar-bites\hero\hero-alt.jpg" },
    
    # Drinks menu images
    @{ Source = "public\images\menu\drinks\hero-drinks.jpg"; Destination = "public\images\menu\drinks\hero\hero.jpg" },
    
    # Set Lunch menu images
    @{ Source = "public\images\menu\set-lunch\hero-set-lunch.jpg"; Destination = "public\images\menu\set-lunch\hero\hero.jpg" },
    
    # Soul Food Weekends menu images
    @{ Source = "public\images\menu\soul-food-weekends\hero-soul-food-weekends.jpg"; Destination = "public\images\menu\soul-food-weekends\hero\hero.jpg" },
    
    # Featured dishes images
    @{ Source = "public\images\menu\featured-dishes\akasa-e-dum-biryani.jpg"; Destination = "public\images\menu\featured-dishes\akasa-e-dum-biryani.jpg" },
    @{ Source = "public\images\menu\featured-dishes\akasa-e-lobster.jpg"; Destination = "public\images\menu\featured-dishes\akasa-e-lobster.jpg" },
    @{ Source = "public\images\menu\featured-dishes\dal-e-akasa.jpg"; Destination = "public\images\menu\featured-dishes\dal-e-akasa.jpg" },
    @{ Source = "public\images\menu\featured-dishes\paronthia-naan.jpg"; Destination = "public\images\menu\featured-dishes\paronthia-naan.jpg" },
    @{ Source = "public\images\menu\featured-dishes\tandoori-pomfret-kebab.jpg"; Destination = "public\images\menu\featured-dishes\tandoori-pomfret-kebab.jpg" },
    @{ Source = "public\images\menu\featured-dishes\tandoori-prawns.jpg"; Destination = "public\images\menu\featured-dishes\tandoori-prawns.jpg" },
    
    # Events page images
    @{ Source = "public\images\events\event3.jpg"; Destination = "public\images\events\hero\hero.jpg" },
    @{ Source = "public\images\events\gallery4.jpg"; Destination = "public\images\events\listings\event-1.jpg" },
    @{ Source = "public\images\unused\gallery1.jpg"; Destination = "public\images\events\listings\event-2.jpg" },
    @{ Source = "public\images\unused\gallery3.jpg"; Destination = "public\images\events\listings\event-3.jpg" },
    
    # Offers page images
    @{ Source = "public\images\offers\gallery5.jpg"; Destination = "public\images\offers\hero\hero.jpg" },
    @{ Source = "public\images\offers\gallery1.jpg"; Destination = "public\images\offers\promotions\weekday-lunch.jpg" },
    @{ Source = "public\images\unused\gallery2.jpg"; Destination = "public\images\offers\promotions\anniversary.jpg" },
    
    # Reservations page images
    @{ Source = "public\images\reservations\gallery3.jpg"; Destination = "public\images\reservations\hero\hero.jpg" },
    
    # Testimonials images
    @{ Source = "public\images\testimonials\avatar1.jpg"; Destination = "public\images\home\testimonials\avatar-1.jpg" },
    @{ Source = "public\images\testimonials\avatar2.jpg"; Destination = "public\images\home\testimonials\avatar-2.jpg" },
    @{ Source = "public\images\testimonials\avatar3.jpg"; Destination = "public\images\home\testimonials\avatar-3.jpg" },
    @{ Source = "public\images\testimonials\testimonial-bg.jpg"; Destination = "public\images\home\testimonials\background-alt.jpg" },
    
    # Common images
    @{ Source = "public\images\common\footer-bg.jpg"; Destination = "public\images\common\footer-background.jpg" }
)

# Copy images to their new locations
foreach ($mapping in $imageMappings) {
    $source = $mapping.Source
    $destination = $mapping.Destination
    
    if (Test-Path $source) {
        # Create destination directory if it doesn't exist
        $destinationDir = Split-Path -Path $destination -Parent
        if (-not (Test-Path $destinationDir)) {
            New-Item -Path $destinationDir -ItemType Directory -Force | Out-Null
        }
        
        # Copy the file
        Copy-Item -Path $source -Destination $destination -Force
        Write-Host "Copied: $source -> $destination"
    } else {
        Write-Host "Source file not found: $source" -ForegroundColor Yellow
    }
}
