
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const IndividualTest = {
    text: ' Events',
    link: '/Events/manageindividualEvents',
    icon: 'fa fa-th-list'

};

const Chat = {
    text: 'Volunteer',
    link:'/chat',
    icon: 'fa fa fa-users'
};

const Menu = {
    text: 'Registration Screens',
    link: '/Category/manageCategory',
    icon: 'fa fa-th-list'
};

const Orders = {
    text : 'Registration',
    link:'/order/allOrder',
    icon: 'fa fa-bars'
};
const Registraion = {
    text : 'Registration',
    link:'/registration/registrationDetails',
    icon: 'fa fa-bars'
};

const Pickup = {
    text: 'Gallery',
    link: '/prescriptions/prescriptions',
    icon: 'fa fa-picture-o'
};

const Reports = {
    text: 'Registration Reports',
    link: '/reports/report',
    icon: 'fa fa-binoculars'
};

const Contacts = {
    text : 'Latest News',
    link:'/contacts/all',
    icon: 'fa fa-envelope-open-o'
};

const Table = {
    text : 'Import',
    link:'/table/booked',
    icon: 'fa fa-bookmark'
};

const Users = {
    text: 'Users',
    link: '/users/manageUsers',
    icon: 'fa fa-users'
};

// const Setting = {
//     text: 'Feedback',
//     link:'/setting',
//     icon: 'fa fa-comment-o'
// };

const Setting = {
    text: 'Feedback',
    link:'/order/allOrder',
    icon: 'fa fa-comment-o'
};

const Tags = {
    text: 'Tags',
    link: '/tags/all',
    icon: 'fa fa-tags'
};

const News = {
    text: 'Carousels',
    link: '/carousels/manageCarousels',
    icon: 'fa fa-picture-o'
};
const Business = {
    text: 'Business Info',
    link: '/businessInfo',
    icon: 'fa fa-briefcase'
};

const Coupons = {
    text: 'Expense Management',
    link: '/coupons/all',
    icon: 'fa fa-list'
};

const pushNotification = {
    text: 'Events-Users CheckedIn',
    link: '/pushNotification',
    icon: 'fa fa-calendar'
};

// const Pages = {
//     text: 'Pages',
//     link: '/pages',
//     icon: 'icon-doc',
//     submenu: [
//         {
//             text: 'Login',
//             link: '/login'
//         },
//         {
//             text: 'Register',
//             link: '/register'
//         },
//         {
//             text: 'Recover',
//             link: '/recover'
//         },
//         {
//             text: '404',
//             link: '/404'
//         }
//     ]
// };

// const Ecommerce = {
//     text: 'Ecommerce',
//     link: '/ecommerce',
//     icon: 'icon-basket-loaded',
//     submenu: [
//         {
//             text: 'Orders',
//             lin k: '/ecommerce/orders'
//         },
//         {
//             text: 'Order View',
//             link: '/ecommerce/orderview'
//         },
//         {
//             text: 'Products',
//             link: '/ecommerce/products'
//         },
//         {
//             text: 'Product View',
//             link: '/ecommerce/productview'
//         },
//         {
//             text: 'Checkout',
//             link: '/ecommerce/checkout'
//         }
//     ]
// }




const headingMain = {
    text: 'Navigation',
    heading: true
};

const headingComponents = {
    text: 'Components',
    heading: true
};

const headingMore = {
    text: 'More',
    heading: true
};

export const menu = [
    Home,
    //IndividualTest,
    //Menu,
   //Orders,
    //Registraion,
    Users,
    Pickup,
    Contacts,
    News,
    Table,
   // Chat,
    Coupons,
    //Tags--events qrcode,
    
   //Business,
    Setting,
    pushNotification,
    Reports
    //Pages
];
