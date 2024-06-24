import { HoleClassification } from '@/shared/enums/category.enum'
import HFUTLifeSvg from '@/assets/svg/home/hfutLife.svg'
import StudySvg from '@/assets/svg/home/study.svg'
import CatSvg from '@/assets/svg/home/cat.svg'
import YourNameSvg from '@/assets/svg/home/love.svg'
import MusicSvg from '@/assets/svg/home/music.svg'
import GameSvg from '@/assets/svg/home/game.svg'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import LostAndFoundSvg from '@/assets/svg/home/lostAndFound.svg'
import SecondHandSvg from '@/assets/svg/home/secondHand.svg'

export const Categories = [
  {
    name: HoleClassification.life,
    description: '学习已经很苦了 😩，来看看水贴娱乐放松一下吧 🎉🎈',
    color: { primary: '#619E68', secondary: '#E3F6E0' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: HFUTLifeSvg,
  },
  {
    name: HoleClassification.study,
    description: '学习是一种态度！一起探索知识的海洋吧！ 📚🧠',
    color: { primary: '#BE7AAC', secondary: '#FFECF5' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: StudySvg,
  },
  {
    name: HoleClassification.littleCreature,
    description: '校园的猫猫 🐱 狗狗 🐶，蛇蛇 🐍，鼠鼠 🐭 多可爱！',
    color: { primary: '#5297C3', secondary: '#DCF6F2' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: CatSvg,
  },
  {
    name: HoleClassification.loveStory,
    description:
      '在这里分享你的情感故事或者小丑经历 🤡，让大家一起陪你度过高兴或者低落的时刻 ❤️😢。',
    color: { primary: '#CB7D4B', secondary: '#FFEDE4' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: YourNameSvg,
  },
  {
    name: HoleClassification.music,
    description:
      '来这里分享你的歌单/歌曲 🎵，让大家一起沉浸在音乐的海洋里，放松心情。 🎧🎶',
    color: { primary: '#D07775', secondary: '#FFECEB' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: MusicSvg,
  },
  {
    name: HoleClassification.game,
    description: '原神，启动！',
    color: { primary: '#899745', secondary: '#F0F4D2' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: GameSvg,
  },
  {
    name: HoleClassification.animation,
    description: '动漫，让我们一起进入奇妙的二次元世界！ 🌸🌟',
    color: { primary: '#828BCF', secondary: '#F0EFFF' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: BilibiliSvg,
  },
  {
    name: HoleClassification.lostAndFound,
    description: '哎呀，谁的东西丢了，快来看看有没有被别人捡到 🕵️‍♂️🔍',
    color: { primary: '#A482C6', secondary: '#F9EDFF' },
    url: 'https://d-ssl.dtstatic.com/uploads/blog/202308/21/5zS3lYbehO5LyGm.thumb.1000_0.jpeg_webp',
    icon: LostAndFoundSvg,
  },
]

export const getCategoryByName = (name: HoleClassification) => {
  return Categories.find((item) => item.name === name)!
}
