import json

with open('assets/data/gallery.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for img in data['images']:
    img_id = img['id']
    year = img['year']
    slug = img['title'].lower().replace(' ', '-').replace('ã', 'a').replace('á', 'a').replace('é', 'e').replace('ç', 'c')[:30]
    
    filename = f"assets/data/gallery/{year}-{img_id}-{slug}.json"
    
    img_data = {
        'title': img['title'],
        'category': img['category'],
        'year': img['year'],
        'description': img['description'],
        'favorite': img['favorite'],
        'tags': img['tags'],
        'image': img['image'],
        'thumbnail': img['thumbnail'],
        'credit': img['credit']
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(img_data, f, ensure_ascii=False, indent=2)

print(f"Criados {len(data['images'])} arquivos")
