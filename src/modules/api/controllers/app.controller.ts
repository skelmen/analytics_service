import { Controller, Get, Post, Body, Res, HttpStatus, Query, Put, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import * as useragent from 'express-useragent';
import { PageViewService } from '../services';
import { AuthGuard } from '../guards';
import { CreatePageViewDto } from '../dto';

@ApiTags('App')
@Controller('page-view')
export class AppController {
    constructor(
        private readonly pageViewService: PageViewService,
    ) { }

    @Post('event')
    async psotEventData(@Req() req, @Res() res, @Body() data: CreatePageViewDto) {
        try {
            const fullPageView = {
                ...data,
                browser: useragent.parse(req.headers['user-agent']).browser,
                country: await this.pageViewService.retreiveCountryByIp(req.clientIp)
            }
            const result = await this.pageViewService.create(fullPageView);
            return res.status(HttpStatus.OK).json({ status: 'success', data: result });
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', data: e.message });
        }
    }

    @ApiHeader({ name: 'Authorization' })
    @UseGuards(AuthGuard)
    @Get('id/:pageId')
    async getManyByPageID(@Res() res, @Param('pageId') pageId: string) {
        try {
            const result = await this.pageViewService.getManyByPageId(pageId);
            return res.status(HttpStatus.OK).json({ status: 'success', data: result });
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', data: e.message });
        }
    }

    @ApiHeader({ name: 'Authorization' })
    @UseGuards(AuthGuard)
    @Get('browser')
    async getManyByBrowser(@Req() req, @Res() res) {
        try {
            const browser = useragent.parse(req.headers['user-agent']).browser;
            const result = await this.pageViewService.getManyByBrowser(browser);
            return res.status(HttpStatus.OK).json({ status: 'success', data: result });
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', data: e.message });
        }
    }

    @ApiHeader({ name: 'Authorization' })
    @UseGuards(AuthGuard)
    @Get('country/all')
    async getManyByCountry(@Req() req, @Res() res) {
        try {
            const result = await this.pageViewService.getManyByCountry(req.clientIp);
            return res.status(HttpStatus.OK).json({ status: 'success', data: result });
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', data: e.message });
        }
    }

    @ApiHeader({ name: 'Authorization' })
    @UseGuards(AuthGuard)
    @Get('country/number')
    async getNumberByCountry(@Req() req, @Res() res) {
        try {
            const result = await this.pageViewService.getNumberByCountry(req.clientIp);
            return res.status(HttpStatus.OK).json({ status: 'success', data: result });
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', data: e.message });
        }
    }

    @ApiHeader({ name: 'Authorization' })
    @UseGuards(AuthGuard)
    @Get('rate')
    async getRate(@Res() res) {
        try {
            const result = await this.pageViewService.getRate();
            return res.status(HttpStatus.OK).json({ status: 'success', data: result.toFixed(2) });
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', data: e.message });
        }
    }

}
