import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinDate,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator'
import { Limit } from '@/shared/config'
import { Type } from 'class-transformer'
import 'reflect-metadata'

class VoteItem {
  @MaxLength(Limit.holeVoteOptionLength, {
    message: `每个选项最长只能是${Limit.holeVoteOptionLength}个字符哦1`,
  })
  @MinLength(1, { message: '每个选项长度至少要有一个字符哦' })
  value: string
}

export class HolePostVoteClassValidator {
  @ArrayMaxSize(Limit.holeVoteMaxLength, {
    message: `最多只能创建${Limit.holeVoteMaxLength}个选项哦`,
  })
  @ArrayMinSize(2, { message: '至少要有两个投票哦' })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => VoteItem)
  items: VoteItem[]
}

export class HoleAddBilibliClassValidator {
  @Validate((value: string) => value.startsWith('BV'), {
    message: 'BV号格式不正确',
  })
  @Length(12, 12, { message: '请输入正确的B站的BV视频号哦' })
  @IsString()
  body: string | null
}
