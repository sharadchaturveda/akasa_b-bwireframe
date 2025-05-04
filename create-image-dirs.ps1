$directories = @(
    "public\images\brand",
    "public\images\home\hero",
    "public\images\home\philosophy",
    "public\images\home\gallery",
    "public\images\home\whats-happening",
    "public\images\home\testimonials",
    "public\images\menu\hero",
    "public\images\menu\chef",
    "public\images\menu\a-la-carte\hero",
    "public\images\menu\a-la-carte\items",
    "public\images\menu\bar-bites\hero",
    "public\images\menu\bar-bites\items",
    "public\images\menu\drinks\hero",
    "public\images\menu\drinks\items",
    "public\images\menu\set-lunch\hero",
    "public\images\menu\set-lunch\items",
    "public\images\menu\soul-food-weekends\hero",
    "public\images\menu\soul-food-weekends\items",
    "public\images\menu\featured-dishes",
    "public\images\events\hero",
    "public\images\events\categories",
    "public\images\events\listings",
    "public\images\offers\hero",
    "public\images\offers\promotions",
    "public\images\reservations\hero",
    "public\images\reservations\gallery",
    "public\images\chef\hero",
    "public\images\chef\gallery",
    "public\images\common"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -Path $dir -ItemType Directory -Force
        Write-Host "Created directory: $dir"
    } else {
        Write-Host "Directory already exists: $dir"
    }
}
