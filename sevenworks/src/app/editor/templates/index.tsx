// Template Index File
// This file centralizes all template imports for easier management

// Import regular templates
import BusinessResume from "./businessResume";
import DataAnalystResume from "./DataAnalystResume";

// Import templates from all_templates directory
import BusinessResumeAlt from "./all_templates/BusinessResume";
import JournalismResume from "./all_templates/JournalismResume";
import LegalResume from "./all_templates/LegalResume";
import HumanServicesResume from "./all_templates/HumanServicesResume";
import InternationalAffairsResume from "./all_templates/InternationalAffairsResume";
import HealthResume from "./all_templates/HealthResume";
import SWEResume from "./all_templates/SWEResume";
import ITConsultingResume from "./all_templates/ITConsultingResume";
import TechnologyResume from "./all_templates/TechnologyResume";
import DataAnalystResumeAlt from "./all_templates/DataAnalystResume";
import EnvironmentResume from "./all_templates/EnvironmentResume";
import MuseumResume from "./all_templates/MuseumResume";
import PublicPolicyResume from "./all_templates/PublicPolicyResume";

// Import templates from components/templates directory
import BusinessTemplate from "../components/templates/business_template";

// Export all templates in a structured object for easier management
const templates = {
  // Regular templates
  business: BusinessResume,
  dataAnalyst: DataAnalystResume,

  // All templates directory
  businessAlt: BusinessResumeAlt,
  journalism: JournalismResume,
  legal: LegalResume,
  humanServices: HumanServicesResume,
  internationalAffairs: InternationalAffairsResume,
  health: HealthResume,
  swe: SWEResume,
  itConsulting: ITConsultingResume,
  technology: TechnologyResume,
  dataAnalystAlt: DataAnalystResumeAlt,
  environment: EnvironmentResume,
  museum: MuseumResume,
  publicPolicy: PublicPolicyResume,

  // Component templates
  businessComponent: BusinessTemplate,
};

export default templates;