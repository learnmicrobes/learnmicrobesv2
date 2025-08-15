import { nodeModuleNameResolver } from "typescript";

export interface RoadmapStep {
  id: string;
  question: string;
  options: {
    text: string;
    nextStep: string | null;
    conclusion?: string;
    tests?: string[];
  }[];
}

export const gramNegativeRoadmap: RoadmapStep[] = [
  {
    id: "start",
    question: "Morphology:",
    options: [
      {
        text: "Gram Negative Rods",
        nextStep: "oxidase-gnr"
      },
      {
        text: "Gram Negative Cocci",
        nextStep: "oxidase-gnc"
      }
    ]
  },


  {
    id: "oxidase-gnr",
    question: "Oxidase Test:",
    options: [
        {
            text: "Positive",
            nextStep: "growth-bap"
        },
        {
            text: "Negative",
            nextStep: "lactose-fermenter"
        }
    ]
  },
{
    id: "lactose-fermenter",
    question: "Lactose Fermenter",
    options: [
        {
            text: "Positive",
            nextStep: "indole-test"
        },
        {
            text: "Negative",
            nextStep: "glucose-fermenter"
        }
    ]
},
{
    id: "indole-test",
    question: "Indole Test",
    options: [
        {
            text: "Positive",
            nextStep: "motility-test"
        },
        {
            text: "Negative",
            nextStep: "urease-production"
        }
    ]
},
{
    id: "motility-test",
    question: "Motility",
    options: [
        {
            text: "Positive",
            nextStep: null,
            conclusion: "Escherichia coli"
            // TSI A/A --
        },
        {
            text: "Negative",
            nextStep: null,
            conclusion: "Klebsiella oxytoca"
            // TSI A/A --
        }
    ]
},
{
    id: "urease-production",
    question: "Urease Production",
    options: [
        {
            text: "Positive",
            nextStep: null,
            conclusion: "Klebsiella pneumoniae"
            // non-motile VP+ TSI A/A-+
        },
        {
            text: "Negative",
            nextStep: null,
            conclusion: "Enterobacter aerogenes"
            // motile VP+ TSI A/A-+
        }
    ]
},

{
    id: "glucose-fermenter",
    question: "Glucose Fermenter",
    options: [
        {
            text: "Positive",
            nextStep: "motility-gluc-pos"
        },
        {
            text: "Negative",
            nextStep: "motility-gluc-neg"
        }
    ]
},
{
    id: "motility-gluc-pos",
    question: "Motility",
    options: [
        {
            text: "Positive",
            nextStep: "h2s-prod-gluc"
        },
        {
            text: "Negative",
            nextStep: null,
            conclusion: "Shigella flexneri" //TSI K/A --
        }
    ]
},
{
    id: "h2s-prod-gluc",
    question: "H2S Production",
    options: [
        {
            text: "Positive",
            nextStep: "indole-gluc"
        },
        {
            text: "Negative",
            nextStep: "citrate-gluc"
        }
    ]
},
{
    id: "indole-gluc",
    question: "Indole",
    options: [
        {
            text: "Positive",
            nextStep: null,
            conclusion: "Proteus vulgaris" //TSI A/A +-
        },
        {
            text: "Negative",
            nextStep: "urease"
        }
    ]
},
{
    id: "urease",
    question: "Urease",
    options: [
        {
            text: "Positive",
            nextStep: null,
            conclusion: "Proteus mirabilis" //TSI K/A +-
        },
        {
            text: "Negative",
            nextStep: null,
            conclusion: "Salmonella enteritidis" //TSI K/A +-
        }
    ]
},
{
    id: "citrate-gluc",
    question: "Citrate",
    options: [
        {
            text: "Positive",
            nextStep: "voges-proskauer"
        },
        {
            text: "Negative",
            nextStep: null,
            conclusion: "Morganella morganii" //Urease Pos and TSI K/A --
        }
    ]
},
{
    id: "voges-proskauer",
    question: "Voges Proskauer",
    options: [
        {
            text: "Positive",
            nextStep: null,
            conclusion: "Serratia marcesens" //TSI K/A --
        },
        {
            text: "Negative",
            nextStep: null,
            conclusion: "Providencia stuartii" //TSI K/A --
        }
    ]
},
    //* Oxidase Positive Pathway ex: Pseudo and Vibrio shit,
  // need work up for Haemophilus like its X and V factors and shit

  {
    id: "growth-bap",
    question: "Growth on Blood Agar",
    options: [
        {
            text: "Yes",
            nextStep: "growth-mac"
        },
        {
            text: "No",
            nextStep: null,
            conclusion: "Haemophilus"
        }
    ]
  },
  {
    id: "growth-mac",
    question: "Growth on MacConkey Agar",
    options: [
        {
            text: "Yes",
            nextStep: "of-fermentation"
        },
        {
            text: "No",
            nextStep: null,
            conclusion: "Pasteurella multocida"
        }
    ]
  },
  {
    id: "of-fermentation",
    question: "Glucose (OF) Fermenter",
    options: [
        {
            text: "Positive",
            nextStep: "O129-sensitivity"
        },
        {
            text: "Negative",
            nextStep: null,
            conclusion: "Pseudomonas aeruginosa"
        }
    ]
  },
  {
    id: "O129-sensitivity",
    question: "O/129 Sensitivity",
    options: [
        {
            text: "Sensitive",
            nextStep: "salt-tolerance"
        },
        {
            text: "Resistant",
            nextStep: null,
            conclusion: "Aeromonas spp."
        }
    ]
  },
  {
    id: "salt-tolerance",
    question: "Halophile/Salt Tolerance",
    options: [
        {
            text: "Yes",
            nextStep: "sucrose-fermentation-tcbs-agar"
        },
        {
            text: "No",
            nextStep: null,
            conclusion: "Plesiomonas shigelloides"
        }
    ]
  },
  {
    id: "sucrose-fermentation-tcbs-agar",
    question: "Ferments Sucrose/ TCBS agar",
    options: [
        {
            text: "Yes/Yellow",
            nextStep: null,
            conclusion: "Vibrio cholerae"
        },
        {
            text: "No/Green",
            nextStep: null,
            conclusion: "Vibrio parahaemolyticus; other Vibrio spp."
        }
    ]
  }
];
