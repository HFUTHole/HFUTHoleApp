import { Limit } from '@/shared/config'
import { IsString, Length } from 'class-validator'

export class EditProfileUsernameValidator {
  @Length(Limit.user.minUsernameLength, Limit.user.maxUsernameLength, {
    message: `用户名长度只能为${Limit.user.minUsernameLength}-${Limit.user.maxUsernameLength}`,
  })
  @IsString()
  username: string
}

export class EditProfileDescValidator {
  @Length(1, 300, {
    message: '最多只能输入300个字符哦',
  })
  @IsString()
  desc: string
}
