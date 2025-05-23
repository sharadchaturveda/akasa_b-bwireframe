import os
from PIL import Image

# Base directory for images
BASE_DIR = "public"

# List of image paths relative to BASE_DIR
missing_images = [
    "images/chef/hero/hero.jpg",
    "images/common/footer-bg.jpg",
    "images/events/event3.jpg",
    "images/events/gallery4.jpg",
    "images/events/hero/hero.jpg",
    "images/home/drink.jpg",
    "images/home/hero/hero.jpg",
    "images/home/location.jpg",
    "images/home/philosophy-bg.jpg",
    "images/home/whats-happening-bg.jpg",
    "images/home/whats-happening.jpg",
    "images/home/gallery/gallery1.jpg",
    "images/home/gallery/gallery2.jpg",
    "images/home/gallery/gallery3.jpg",
    "images/home/gallery/gallery4.jpg",
    "images/home/gallery/gallery5.jpg",
    "images/home/philosophy/background.jpg",
    "images/home/philosophy/drink.jpg",
    "images/home/testimonials/avatar-2.jpg",
    "images/offers/gallery1.jpg",
    "images/offers/gallery5.jpg",
    "images/reservations/gallery3.jpg",
    "images/testimonials/testimonial-bg.jpg",
    "images/unused/chef.jpg",
    "images/unused/drink.jpg",
    "images/unused/gallery1.jpg",
    "images/unused/gallery2.jpg",
    "images/unused/gallery3.jpg",
    "images/unused/gallery5.jpg",
    "images/unused/gallery6.jpg",
    "images/unused/hero.jpg",
    "images/unused/texture-bg-1.jpg",
    "images/unused/texture-bg-2.jpg",
]

def convert_image(file_path):
    base, ext = os.path.splitext(file_path)
    avif_path = base + ".avif"
    webp_path = base + ".webp"

    if os.path.exists(avif_path) or os.path.exists(webp_path):
        print(f"Skipping {file_path} — AVIF or WebP already exists.")
        return

    try:
        with Image.open(file_path) as img:
            img.save(avif_path, format="AVIF")
            print(f"Saved AVIF: {avif_path}")

            img.save(webp_path, format="WEBP", quality=80)
            print(f"Saved WebP: {webp_path}")

    except Exception as e:
        print(f"Failed to convert {file_path}: {e}")

def main():
    for rel_path in missing_images:
        full_path = os.path.join(BASE_DIR, rel_path)
        if os.path.exists(full_path):
            convert_image(full_path)
        else:
            print(f"File not found: {full_path}")

if __name__ == "__main__":
    main()
