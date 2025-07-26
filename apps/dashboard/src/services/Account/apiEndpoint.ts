import { IAccount } from '../../Models/accountModels';
import { ApiServices } from '../apiServices';

export const accountServices = new ApiServices<IAccount>('/api/accounts');
