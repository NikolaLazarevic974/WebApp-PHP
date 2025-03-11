import requests
import os

def download_shirt_images(api_key, query, num_images=10):
    base_url = "https://api.unsplash.com/search/photos"
    headers = {
        "Authorization": f"Client-ID {api_key}"
    }
    params = {
        "query": query,
        "per_page": num_images
    }

    response = requests.get(base_url, headers=headers, params=params)
    data = response.json()

    if not os.path.exists(f"{query}_images"):
        os.makedirs(f"{query}_images")

    for i, image in enumerate(data["results"], 1):
        image_url = image["urls"]["regular"]
        image_response = requests.get(image_url)
        
        if image_response.status_code == 200:
            with open(f"{query}_images/pants_{i}.jpg", "wb") as file:
                file.write(image_response.content)
            print(f"Downloaded pants_{i}.jpg")
        else:
            print(f"Failed to download image {i}")

    print("Download complete!")

# Replace 'YOUR_API_KEY' with your actual Unsplash API key
api_key = "fDq1TNerje6C3ijljgh_D5FL9NAi8ywX-UX9f7LnGwg"
download_shirt_images(api_key, "jeans men", 3)
