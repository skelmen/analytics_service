import { ApiProperty } from '@nestjs/swagger';

export class CreatePageViewDto {
    @ApiProperty()
    readonly userId: string;

    @ApiProperty()
    readonly pageId: string;
}
