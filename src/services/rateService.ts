export interface RateQuote {
  serviceName: string;
  deliveryDate: string;
  deliveryTime: string;
  price: number;
  discountedPrice: number;
  savingsPercentage: number;
  badge?: string;
  guaranteed: boolean;
}

export interface CalculateRateInput {
  fromZip: string;
  toZip: string;
  weightLbs: number;
  packaging: 'FedEx Envelope' | 'FedEx Pak' | 'FedEx Box' | 'Your Packaging';
  isCommercial?: boolean;
}

export const rateService = {
  async calculateRates(input: CalculateRateInput): Promise<RateQuote[]> {
    await new Promise((resolve) => setTimeout(resolve, 120));

    const baseWeight = Math.max(1, input.weightLbs || 1);
    
    return [
      {
        serviceName: 'FedEx First Overnight®',
        deliveryDate: 'Tomorrow',
        deliveryTime: 'By 8:00 AM or 8:30 AM',
        price: Math.round((78 + baseWeight * 6.5) * 100) / 100,
        discountedPrice: Math.round((78 + baseWeight * 6.5) * 0.6 * 100) / 100,
        savingsPercentage: 40,
        badge: 'Fastest Delivery',
        guaranteed: true
      },
      {
        serviceName: 'FedEx Priority Overnight®',
        deliveryDate: 'Tomorrow',
        deliveryTime: 'By 10:30 AM (12:00 PM residences)',
        price: Math.round((58 + baseWeight * 4.8) * 100) / 100,
        discountedPrice: Math.round((58 + baseWeight * 4.8) * 0.6 * 100) / 100,
        savingsPercentage: 40,
        badge: 'Most Popular Express',
        guaranteed: true
      },
      {
        serviceName: 'FedEx 2Day®',
        deliveryDate: 'In 2 Business Days',
        deliveryTime: 'By 4:30 PM (8:00 PM residences)',
        price: Math.round((32 + baseWeight * 3.1) * 100) / 100,
        discountedPrice: Math.round((32 + baseWeight * 3.1) * 0.65 * 100) / 100,
        savingsPercentage: 35,
        guaranteed: true
      },
      {
        serviceName: input.isCommercial ? 'FedEx Ground®' : 'FedEx Home Delivery®',
        deliveryDate: '2-3 Business Days',
        deliveryTime: 'End of Day (Every Day including Weekends)',
        price: Math.round((14 + baseWeight * 1.8) * 100) / 100,
        discountedPrice: Math.round((14 + baseWeight * 1.8) * 0.8 * 100) / 100,
        savingsPercentage: 20,
        badge: 'Best Value',
        guaranteed: false
      }
    ];
  }
};
