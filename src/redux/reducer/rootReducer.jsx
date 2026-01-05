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
import { businessTypeReducer } from "./businessTypeReducer";
import leadSourceReducer from "./leadSourceReducer";
import leadStatusReducer from "./leadStatusReducer";
import { leadReducer } from "./leadReducer";
import { leadHistoryReducer } from "./leadTeamReducer";
import latestUpdatesReducer from "./latestUpdateReducer";
import mouStatusReducer from "./mouReducer";
import { wingsReducer } from "./wingReducer";
import sellerAuthReducer from "./sellerAuthReducer";
import documentCategoryReducer from "./docCategoryReducer";
import { documentReducer } from "./docTypeReducer";
import emailReducer from "./emailReducer";
import { invoiceReducer } from "./invoiceReducer";
import ExecutiveDashboardReducer from "./executiveDashboardReducer";
import { subDepartmentReducer } from "./subDepartmentReducer";
import { tasksReducer } from "./taskReducer";
import { teamSellerReducer } from "./teamSellerReducer";
import adminProductReducer from "./adminProductReducer";
import sellerProductReducer from "./sellerProductsReducer";

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
  lifestylePhotography: lifeStylePhotographyReducer,
  modelPhotography: modelPhotographyReducer,
  aContentPhotography: aContentPhotographyReducer,
  storePhotography: storePhotographyReducer,
  socialMediaPhotography: socialMediaContentPhotographyReducer,
  lifestyleActivities: lifestyleActivitiesReducer,
  modelActivities: lifestyleActivitiesReducer,
  businessTypes: businessTypeReducer,
  leadSources: leadSourceReducer,
  leadStatus: leadStatusReducer,
  leads: leadReducer,
  leadHistory: leadHistoryReducer,
  latestUpdates: latestUpdatesReducer,
  mouStatus: mouStatusReducer,
  mou: mouStatusReducer,
  wings: wingsReducer,
  sellerAuth: sellerAuthReducer,
  documentCategory: documentCategoryReducer,
  documents: documentReducer,
  managerApproval: businessReducer,
  email: emailReducer,
  documentApproval: mouStatusReducer,
  categories:businessReducer, 
  invoices:invoiceReducer,
  executiveDashboard:ExecutiveDashboardReducer,
  partialDocuments:mouStatusReducer,
  sellerProductInfo: businessReducer,
  invoiceAccounts:invoiceReducer,
  generateInvoice:invoiceReducer,
  subDepartments: subDepartmentReducer,
  tasks:tasksReducer,
  teamSeller: teamSellerReducer,
  adminProducts: adminProductReducer,
  sellerProducts: sellerProductReducer,
});


export default rootReducer;