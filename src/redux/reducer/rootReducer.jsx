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
import serviceActivityReducer from "./serviceActivityReducer";

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

});


export default rootReducer;