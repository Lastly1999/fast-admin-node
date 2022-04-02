import { Logger as Nestlogger } from "@nestjs/common"
import { Logger, QueryRunner } from "typeorm"

export class MyCustomLogger implements Logger {
    log(_level: "log" | "info" | "warn", message: any, _queryRunner?: QueryRunner): any {
        Nestlogger.log(message, "TypeORMLog")
    }

    logMigration(message: string, _queryRunner?: QueryRunner): any {
        Nestlogger.log("TypeORMMigration", message)
    }

    logQuery(query: string, _parameters?: any[], _queryRunner?: QueryRunner): any {
        Nestlogger.log(
            query
                .toString()
                .replace(/\ +/g, "")
                .replace(/[\r\n]/g, " "),
            "TypeORMLog"
        )
    }

    logQueryError(error: string | Error, _query: string, _parameters?: any[], _queryRunner?: QueryRunner): any {
        Nestlogger.error(`${error}`, "TypeORMQueryError")
    }

    logQuerySlow(time: number, query: string, _parameters?: any[], _queryRunner?: QueryRunner): any {
        Nestlogger.warn(`${query};Time:${time}`, "TypeORMQuerySlow")
    }

    logSchemaBuild(message: string, _queryRunner?: QueryRunner): any {
        Nestlogger.warn(message, "TypeORMSchemaBuild")
    }
}
