import { HoleClassification } from '@/shared/enums/category.enum'
import HFUTLifeSvg from '@/assets/svg/home/hfutLife.svg'
import StudySvg from '@/assets/svg/home/study.svg'
import PartnerSvg from '@/assets/svg/home/partner.svg'
import CatSvg from '@/assets/svg/home/cat.svg'
import ClubSvg from '@/assets/svg/home/club.svg'
import YourNameSvg from '@/assets/svg/home/love.svg'
import MusicSvg from '@/assets/svg/home/music.svg'
import GameSvg from '@/assets/svg/home/game.svg'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import LostAndFoundSvg from '@/assets/svg/home/lostAndFound.svg'
import SecondHandSvg from '@/assets/svg/home/secondHand.svg'

export const Categories = [
  {
    route: 'hfut-life',
    name: HoleClassification.life,
    description: '学习已经很苦了 😩，来看看水贴娱乐放松一下吧 🎉🎈',
    children: ['工大广场', '身边趣事', '镜头下的工大', '今天win了吗'],
    color: { primary: '#619E68', secondary: '#E3F6E0' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: HFUTLifeSvg,
  },
  {
    route: 'study',
    name: HoleClassification.study,
    description: '学习是一种态度！一起探索知识的海洋吧！ 📚🧠',
    children: ['学在工大', '考研', '竞赛', '讲座', '书籍资料'],
    color: { primary: '#BE7AAC', secondary: '#FFECF5' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: StudySvg,
  },
  {
    route: 'partner',
    name: HoleClassification.partner,
    description:
      '来这找人一起约球 🏀，干饭 🍽️，学习 📚，旅游 ✈️ 多是一件美事！',
    children: ['约球', '约饭', '娱乐', '学习', '旅游'],
    color: { primary: '#CA7792', secondary: '#FFEDF0' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: PartnerSvg,
  },
  {
    route: 'little-creature',
    name: HoleClassification.littleCreature,
    description: '校园的猫猫 🐱 狗狗 🐶，蛇蛇 🐍，鼠鼠 🐭 多可爱！',
    children: ['屯', '翠', '宣'],
    color: { primary: '#5297C3', secondary: '#DCF6F2' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: CatSvg,
  },
  {
    route: 'club-activities',
    name: HoleClassification.clubActivities,
    description:
      '闲暇时光，你是否渴望加入一个充满活力和创造力的社团？这里有各种各样的社团活动等待着你的参与，让你的大学生活更加精彩纷呈！ 😄✨',
    children: ['屯', '翠', '宣'],
    color: { primary: '#369F97', secondary: '#DCF6F2' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: ClubSvg,
  },
  {
    route: 'love-story',
    name: HoleClassification.loveStory,
    description:
      '在这里分享你的情感故事或者小丑经历 🤡，让大家一起陪你度过高兴或者低落的时刻 ❤️😢。',
    children: ['你和Ta的故事', '小丑故事'],
    color: { primary: '#CB7D4B', secondary: '#FFEDE4' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: YourNameSvg,
  },
  {
    route: 'music',
    name: HoleClassification.music,
    description:
      '来这里分享你的歌单/歌曲 🎵，让大家一起沉浸在音乐的海洋里，放松心情。 🎧🎶',
    children: ['网抑云'],
    color: { primary: '#D07775', secondary: '#FFECEB' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: MusicSvg,
  },
  {
    route: 'game',
    name: HoleClassification.game,
    description: '游戏是人生的一部分！原神，启动！ 🎮🔥',
    children: ['王者荣耀', '原神', '主机游戏', '手机游戏', '音游', 'galgame'],
    color: { primary: '#899745', secondary: '#F0F4D2' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: GameSvg,
  },
  {
    route: 'animation',
    name: HoleClassification.animation,
    description: '动漫，让我们一起进入奇妙的二次元世界！ 🌸🌟',
    children: ['动漫交流'],
    color: { primary: '#828BCF', secondary: '#F0EFFF' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: BilibiliSvg,
  },
  {
    route: 'lost-and-found',
    name: HoleClassification.lostAndFound,
    description: '哎呀，谁的东西丢了，快来看看有没有被别人捡到 🕵️‍♂️🔍',
    children: ['屯', '翠', '宣'],
    color: { primary: '#A482C6', secondary: '#F9EDFF' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: LostAndFoundSvg,
  },
  {
    route: 'tao-second-hand',
    name: HoleClassification.taoSecondHand,
    description: '一手太贵，还是来看看二手吧 QWQ',
    children: ['屯', '翠', '宣'],
    color: { primary: '#BF8437', secondary: '#FFEEDF' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: SecondHandSvg,
  },
]

export const getCategoryByName = (name: HoleClassification) => {
  return Categories.find((item) => item.name === name)!
}
