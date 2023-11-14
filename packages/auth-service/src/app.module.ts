import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [DomainModule, ConfigModule],
  providers: [AppService],
})
export class AppModule {}
