import React from 'react';
import { ContentPage } from './ContentPage';
import { CONTENT_PAGES } from '../data/contentPages';

export const ShippingOverviewPage: React.FC = () => <ContentPage data={CONTENT_PAGES['shipping-overview']} />;
export const InternationalPage: React.FC = () => <ContentPage data={CONTENT_PAGES['international']} />;
export const DropOffPage: React.FC = () => <ContentPage data={CONTENT_PAGES['drop-off']} />;
export const SmallBusinessPage: React.FC = () => <ContentPage data={CONTENT_PAGES['small-business']} />;
export const AboutPage: React.FC = () => <ContentPage data={CONTENT_PAGES['about']} />;
export const CompanyPage: React.FC = () => <ContentPage data={CONTENT_PAGES['company']} />;
export const CareersPage: React.FC = () => <ContentPage data={CONTENT_PAGES['careers']} />;
export const InvestorsPage: React.FC = () => <ContentPage data={CONTENT_PAGES['investors']} />;
export const NewsroomPage: React.FC = () => <ContentPage data={CONTENT_PAGES['newsroom']} />;
export const SustainabilityPage: React.FC = () => <ContentPage data={CONTENT_PAGES['sustainability']} />;
export const DeveloperPage: React.FC = () => <ContentPage data={CONTENT_PAGES['developer']} />;
export const MobilePage: React.FC = () => <ContentPage data={CONTENT_PAGES['mobile']} />;
