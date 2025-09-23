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
<<<<<<< HEAD
import { subServiceReducer } from "./subServiceReducer";
import { serviceActivityReducer } from "./serviceActivityReducer";
=======
import serviceActivityReducer from "./serviceActivityReducer";
import { subServiceReducer } from "./subServiceReducer";
>>>>>>> 678279a1584a9a190f59c8f0aab5dc6362c35ff3

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
<<<<<<< HEAD
});
=======
  keyAccountAllCommissions:keyAccountSubscriptionReducer
,});
>>>>>>> 678279a1584a9a190f59c8f0aab5dc6362c35ff3


export default rootReducer;