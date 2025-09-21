import logoNew from './newLogo.svg'
import logo from './logo.svg'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import img_1 from './img_1.jpg'
import img_2 from './img_2.jpg'
import img_3 from './img_3.jpg'
import img_4 from './img_4.jpg'
import img_5 from './img_5.jpg'
import img_6 from './img_6.jpg'
import lawyer from './person1.png'
import proffessor from './person2.png'
import cashier from './person3.png'
import ai from './ai.png'
import view from './view.svg'
import hide from './hide.svg'
export const assets = {
    hide,
    view,
    img_1,
    ai,
    img_2,
    img_3,
    img_4,
    img_5,
    img_6,
    logoNew,
    logo,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Share',
      description: 'Instantly download your creation or share it with the world directly from our platform.',
      icon: step_icon_3,
    },
  ];

export const testimonialsData = [
    {
    image: proffessor,
    name: 'Donald Jackman',
    role: 'Graphic Designer',
    stars: 5,
    text: `The text-to-image results are amazing. I can turn a simple idea into a professional-looking visual in minutes.`
},
{
    image: cashier,
    name: 'Sarah Williams',
    role: 'Content Creator',
    stars: 4,
    text: `I love how easy it is to generate images from just a few words. It saves me so much time when creating content for my channels.`
},
{
    image: lawyer,
    name: 'Stuart Brown',
    role: 'Graphic Designer',
    stars: 5,
    text: `This tool feels like magic—describe what you want, and it creates it. It has completely changed how I approach design projects.`
},
]

export const plans = [
    {
      id: 'Basic',
      price: 10,
      credits: 100,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 50,
      credits: 500,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 250,
      credits: 5000,
      desc: 'Best for enterprise use.'
    },
  ]