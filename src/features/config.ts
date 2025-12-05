import { Feature } from "./types";

import { adminsConfig } from "./admins/config";
import { blogConfig } from "./blog/config";
import { catalogConfig } from "./catalog/config";
import { contactConfig } from "./contact/config";
import { eventsConfig } from "./events/config";
import { faqConfig } from "./faq/config";
import { integrationsConfig } from "./integrations/config";
import { jobOffersConfig } from "./job-offers/config";
import { mediaConfig } from "./media/config";
import { openingHoursConfig } from "./opening-hours/config";
import { pressReleasesConfig } from "./press-releases/config";
import { restaurantMenuConfig } from "./restaurant-menu/config";
import { teamConfig } from "./team/config";
import { testimonialsConfig } from "./testimonials/config";

const mandatoryFeatures: Feature[] = [adminsConfig, mediaConfig];

const features: Feature[] = [
  ...mandatoryFeatures,
  faqConfig,
  blogConfig,
  teamConfig,
  eventsConfig,
  contactConfig,
  catalogConfig,
  jobOffersConfig,
  integrationsConfig,
  openingHoursConfig,
  testimonialsConfig,
  pressReleasesConfig,
  restaurantMenuConfig,
];

export const seeds = features.flatMap((f) => f.seeds);
export const globals = features.flatMap((f) => f.globals);
export const collections = features.flatMap((f) => f.collections);
