import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator'
import { SchoolAreaEnum } from '@/shared/enums/school-area.enum'

export class UsedGoodsCreateValidator {
  @Length(1, 5000, { message: '正文长度必须要有1-5000字哦' })
  @IsString({ message: '正文不能为空哦' })
  body: string

  @IsString()
  price: string

  @IsEnum(SchoolAreaEnum, {
    message: '请选择校区哦',
  })
  area: string
}
