import { Controller } from '@nestjs/common';
import { AppConfigService } from './app-config.service';

@Controller()
export class AppConfigController {
    constructor(private readonly appConfigService: AppConfigService) {}
}
