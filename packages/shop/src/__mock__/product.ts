import { Product } from "../models"

export const products: Product[] = [
  {
    id: "1",
    ownerId: 1,
    title: "Red Shirt",
    imageUrl: "https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg",
    description: "A red t-shirt, perfect for days with non-red weather.",
    price: 29.99
  },
  {
    id: "2",
    ownerId: 1,
    title: "Blue Carpet",
    imageUrl: "https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Fits your red shirt perfectly. To stand on. Not to wear it.",
    price: 99.99
  },
  {
    id: "3",
    ownerId: 2,
    title: "Coffee Mug",
    imageUrl: "https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg",
    description: "Can also be used for tea!",
    price: 8.99
  },
  {
    id: "4",
    ownerId: 3,
    title: "The Book - Limited Edition",
    imageUrl: "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg",
    description: "What the content is? Why would that matter? It's a limited edition!",
    price: 15.99
  },
  {
    id: "5",
    ownerId: 3,
    title: "PowerBook",
    imageUrl: "https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg",
    description: "Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!",
    price: 2299.99
  },
  {
    id: "6",
    ownerId: 1,
    title: "Pen & Paper",
    imageUrl: "https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg",
    description: "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    price: 5.49
  },
  {
    id: "7",
    ownerId: 1,
    title: "Sonny",
    imageUrl: "https://blog.kakaocdn.net/dn/cPgamW/btq0Y4obDli/2Bg0K5Zdky3Fkrdb0sKT7K/img.jpg",
    description: "The World class football player!",
    price: 1300
  },
  {
    id: "8",
    ownerId: 1,
    title: "Harry",
    imageUrl: "https://www.fcbarcelonanoticias.com/uploads/s1/11/93/86/8/harry-kane-celebrando-un-gol.jpeg",
    description: "The King of Spurs!",
    price: 2900
  }
]
