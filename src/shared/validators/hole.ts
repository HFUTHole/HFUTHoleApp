import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator'
import { Limit } from '@/shared/config'
import { Type } from 'class-transformer'
import { HolePostVoteClassValidator } from '@/shared/validators/hole/post'
import { ArticleCategoryEnum } from '@/shared/enums'
import { HoleClassification } from '@/shared/enums/category.enum'

export class PostHoleValidator {
  @MaxLength(Limit.holeBodyMaxLength, {
    message: `最多只能有${Limit.holeBodyMaxLength}个字哦`,
  })
  @MinLength(1, { message: '帖子至少要有一个字哦' })
  @IsNotEmpty({ message: '不能为空哦' })
  body: string

  @MaxLength(Limit.hole.titleMaxLength, {
    message: `标题最长只能有${Limit.hole.titleMaxLength}个字哦`,
  })
  @IsString()
  @IsOptional()
  title?: string

  @ArrayMaxSize(4, { message: '最多只能上传4张图片哦' })
  @IsArray()
  @IsOptional()
  imgs?: string[]

  @MaxLength(Limit.holeVoteOptionLength, {
    each: true,
    message: `每个选项最长只能是${Limit.holeVoteOptionLength}个字符哦`,
  })
  @IsArray()
  @IsOptional()
  tags: string[] = []

  @ValidateNested()
  @Type(() => HolePostVoteClassValidator)
  @IsOptional()
  vote: HolePostVoteClassValidator

  @IsBoolean()
  @IsOptional()
  isMultipleVote: boolean

  @Validate((value: string) => value.startsWith('BV'), {
    message: 'BV号格式不正确',
  })
  @Length(12, 12, { message: '请输入正确的B站的BV视频号哦' })
  @IsString()
  @IsOptional()
  bilibili?: string
}
