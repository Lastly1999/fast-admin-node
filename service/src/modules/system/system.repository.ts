import { Like, Repository, EntityRepository } from "typeorm"
import { SysIcon } from "./entitys/sys-icon.entitys"

@EntityRepository(SysIcon)
export class SystemRepository extends Repository<SysIcon> {
    /**
     * 查询系统图标集
     * @param pageSize
     * @param pageNo
     * @param keywords
     */
    async getIcons(pageSize = 10, pageNo = 1, keywords?: string) {
        return this.manager.getRepository(SysIcon).find({
            take: pageSize,
            skip: pageNo,
            where: {
                iconName: Like(`%${keywords}%`),
            },
        })
    }
}
