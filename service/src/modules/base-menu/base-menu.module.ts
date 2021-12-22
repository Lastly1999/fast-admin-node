import { Module } from "@nestjs/common"
import { BaseMenuService } from "./base-menu.service"
import { BaseMenuController } from "./base-menu.controller"

@Module({
    providers: [BaseMenuService],
    controllers: [BaseMenuController],
})
export class BaseMenuModule {}
