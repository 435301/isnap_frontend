import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import teamsReducer from "./teamsReducer";
import rolesReducer from "./rolesReducer";
import stateReducer from "./stateReducer";
import { categoryReducer } from "./categoryReducer";
import { marketTypeReducer } from "./marketTypeReducer";
import serviceTypeReducer from "./serviceTypeReducer";
import departmentReducer from "./departmentReducer";
import productReducer from "./productReducer";
import commissionReducer from "./commissionReducer";
import billingReducer from "./billingReducer";
import businessReducer from "./businessReducer";
import { businessLaunchReducer } from "./businessLaunchReducer";
import { catalogListingReducer } from "./catalogListingReducer";
import keyAccountSubscriptionReducer from "./keyAccountSubscriptionReducer";
import { digitalMarketReducer } from "./digitalMarketReducer";
import subServiceReducer from './subServiceReducer';
import { serviceActivityReducer } from "./serviceActivityReducer";
import { digitalMarketingReducer } from "./digitalMarketingReducer";
import { productPhotographyReducer } from "./productPhotographyReducer";
import { lifeStylePhotographyReducer } from "./lifeStylePhotographyReducer";
import { modelPhotographyReducer } from "./modelPhotographyReducer";
import { aContentPhotographyReducer } from "./A+PhotographyReducer";
import { storePhotographyReducer } from "./storePhotographyReducer";
import { socialMediaContentPhotographyReducer } from "./socialMediaPhotographyReducer";
import { lifestyleActivitiesReducer } from "./photographyFilterReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  teams: teamsReducer,
  roles: rolesReducer,
  product: productReducer,
  billing: billingReducer,
  business: businessReducer,
  state: stateReducer,
  category: categoryReducer,
  marketType: marketTypeReducer,
  serviceType: serviceTypeReducer,
  department: departmentReducer,
  commission: commissionReducer,
  businessLaunches: businessLaunchReducer,
  catalogListing: catalogListingReducer,
  subscriptions: keyAccountSubscriptionReducer,
  digitalMarket: digitalMarketReducer,
  serviceActivity: serviceActivityReducer,
  subServices: subServiceReducer,
  keyAccountAllCommissions: keyAccountSubscriptionReducer,
  digitalMarketing: digitalMarketingReducer,
  productPhotography: productPhotographyReducer,
  lifestylePhotography:lifeStylePhotographyReducer,
  modelPhotography:modelPhotographyReducer,
  aContentPhotography:aContentPhotographyReducer,
  storePhotography:storePhotographyReducer,
  socialMediaPhotography:socialMediaContentPhotographyReducer,
  lifestyleActivities:lifestyleActivitiesReducer,
  modelActivities:lifestyleActivitiesReducer,
});


export default rootReducer;