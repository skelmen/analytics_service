import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { IPageView } from '../interfaces/schemas';
import { CreatePageViewDto } from '../dto';

@Injectable()
export class PageViewService {

    constructor(
        @InjectModel('PageView') private readonly pageViewModel: Model<IPageView>,
    ) { }

    async create(pageView): Promise<IPageView> {
        const newPageView = new this.pageViewModel(pageView);
        return await newPageView.save();
    }

    async getManyByPageId(pageId: string): Promise<Array<IPageView>> {
        const pageViews = await this.pageViewModel.find({ pageId: pageId });
        return pageViews;
    }

    async getManyByBrowser(browser: string): Promise<Array<IPageView>> {
        const pageViews = await this.pageViewModel.find({ browser: browser });
        return pageViews;
    }

    async getManyByCountry(userIp: string): Promise<Array<IPageView>> {
        const country = await this.retreiveCountryByIp(userIp);
        const pageViews = await this.pageViewModel.find({ country: country });
        return pageViews;
    }

    async getNumberByCountry(userIp: string): Promise<number> {
        const country = await this.retreiveCountryByIp(userIp);
        const pageViews = await this.pageViewModel.find({ country: country });
        return pageViews.length;
    }

    async getRate(): Promise<number> {
        const countUsersById = await this.pageViewModel.aggregate(
            [
                { 
                    $group: {_id: "$userId", count: { $sum: 1 } } 
                },
            ]
        );
        const totalUsersMoreThanOnce = countUsersById.filter(user => user.count > 1);
        const totalUniqueUsers = await this.pageViewModel.distinct('userId');
        return totalUsersMoreThanOnce.length / totalUniqueUsers.length;
    }

    async retreiveCountryByIp(ip: string): Promise<AxiosResponse> {
        const country = await axios.get(`https://ipapi.co/${ip}/country/`);
        return country.data;
    }


}
