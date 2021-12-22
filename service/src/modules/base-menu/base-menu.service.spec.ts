import { Test, TestingModule } from "@nestjs/testing"
import { BaseMenuService } from "./base-menu.service"

describe("BaseMenuService", () => {
    let service: BaseMenuService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BaseMenuService],
        }).compile()

        service = module.get<BaseMenuService>(BaseMenuService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
