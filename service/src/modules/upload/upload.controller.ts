import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common"
import { UploadService } from "./upload.service"
import { FileInterceptor } from "@nestjs/platform-express"

@Controller("upload")
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    async testUpload(@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.uploadTest(file)
    }
}
