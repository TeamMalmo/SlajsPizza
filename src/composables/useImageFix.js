import { ref } from 'vue';

export function useImageFix(menu) {
    const images = {
        'Greek salad': 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0',
        'Caesar salad': 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
        'Italian salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        'Shrimp salad': 'https://images.unsplash.com/photo-1551248429-40975aa4de74',
        'Sprite': 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3',
        'Fanta orange': 'https://images.unsplash.com/photo-1624517452488-04869289c4ca',
        'Coca cola': 'https://images.unsplash.com/photo-1554866585-cd94860890b7',
        'Bubblewater': 'https://images.unsplash.com/photo-1523362628745-0c100150b504'
    }

    const temporaryMenu = ref(menu)

    temporaryMenu.value.filter(item => (item.type === 'salad' || item.type === 'drinks') && item.imgUrl.includes('no-image'))
    .forEach(item => {
        if(!(item.name in images)) item.imgUrl = 'random_image'
        else item.imgUrl = images[item.name]
    });

    return temporaryMenu.value
}