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
  image?: string;
}

export const gramPositiveRoadmap: RoadmapStep[] = [
  {
    id: "start",
    question: "Morphology:",
    options: [
      {
        text: "Gram Positive Cocci",
        nextStep: "cocci-confirm"
      },
      {
        text: "Gram Positive Rods",
        nextStep: "rods-confirm"
      }
    ]
  },
  // Cocci Pathway
  {
    id: "cocci-confirm",
    question: "Catalase Test Result:",
    options: [
      {
        text: "Positive",
        nextStep: "coagulase-test",
      },
      {
        text: "Negative",
        nextStep: "hemolysis-test"
      }
    ]
  },
{
  id: "coagulase-test",
  question: "Coagulase Test Result:",
  options: [
    {
      text: "Positive",
      nextStep: null,
      conclusion: "Staphylococcus aureus"
    },
    {
      text: "Negative",
      nextStep: "oxidase-bacitracin"
    }
  ]
},
  {
    id: "oxidase-bacitracin",
    question: "Oxidase & Bacitracin Test Result:",
    options: [
      {
        text: "Positive/Sensitive",
        nextStep: null,
        conclusion: "Micrococcus"
      },
      {
        text: "Negative/Resistant",
        nextStep: "pyr-test"
      }
    ]
  },
  {
    id: "pyr-test",
    question: "PYR test:",
    options: [
      {
        text: "Positive",
        nextStep: null,
        conclusion: "Staphylococcus lugdunensis"
      },
      {
        text: "Negative",
        nextStep: "novobiocin-test"
      }
    ]
  },
  {
    id: "novobiocin-test",
    question: "Novobiocin Susceptibility:",
    options: [
      {
        text: "Sensitive",
        nextStep: null,
        conclusion: "Staphylococcus epidermidis"
      },
      {
        text: "Resistant",
        nextStep: null,
        conclusion: "Staphylococcus saprophyticus"
      }
    ]
  },

  // Catalase Neg Alpha Streps and shit


 {
  id: "hemolysis-test",
  question: "Hemolysis Pattern:",
  options: [
    { text: "Alpha", nextStep: "optochin-test",},
    { text: "Beta", nextStep: "pyr-bacitracin-beta",},
    { text: "Gamma", nextStep: "bile-esculin-gamma" }
  ]
},

    {
    id: "optochin-test",
    question: "Optochin Susceptibility:",
    options: [
      {
        text: "Sensitive",
        nextStep: null,
        conclusion: "Streptococcus pneumoniae",
      },
      {
        text: "Resistant",
        nextStep: "bile-esculin-alpha"
      }
    ]
  },
  {
    id: "bile-esculin-alpha",
    question: "Bile Esculin:",
    options: [
      {
        text: "Positive",
        nextStep: "pyr-nacl"
      },
      {
        text: "Negative",
        nextStep: null,
        conclusion: "Viridans streptococci"
      }
    ]
  },
  {
    id: "bile-esculin-gamma",
    question: "Bile Esculin",
    options: [
      {
        text: "Positive",
        nextStep: "pyr-nacl"
      },
      {
        text: "Negative",
        nextStep: null,
        conclusion: "Non-hemolytic Streptoccoci"
      }
    ]
  },
  {
    id: "pyr-nacl",
    question: "PYR & 6.5% NaCl:",
    options: [
      {
        text: "Positive",
        nextStep: null,
        conclusion: "Enterococcus Group D"
      },
      {
        text: "Negative",
        nextStep: null,
        conclusion: "Non-enterococcus Group D"
      }
    ]
  },
  {
    id: "pyr-bacitracin-beta",
    question: "PYR test | Bacitracin sensitivity",
    options: [
      {
        text: "Positive | Sensitive",
        nextStep: null,
        conclusion: "Streptococcus pyogenes"
      },
      {
        text: "Negative | Resistant",
        nextStep: "hippurate-camp"
      }
    ]
  },
  {
    id: "hippurate-camp",
    question: "Hippurate | CAMP test",
    options: [
      {
        text: "Positive",
        nextStep: null,
        conclusion: "Streptococcus agalactiae"
      },
      {
        text: "Negative",
        nextStep: null,
        conclusion: "B-hemolytic Streptocci Not Grp A, B"
      }
    ]
  },
  // Rods Pathway
  {
    id: "rods-confirm",
    question: "Does it produce spores?",
    options: [
      {
        text: "Yes",
        nextStep: "motility-hemolysis"
      },
      {
        text: "No",
        nextStep: "catalase-gpr"
      }
    ]
  },
  {
    id: "motility-hemolysis",
    question:"Motility | Hemolysis",
    options: [
      {
        text: "Positive",
        nextStep: null,
        conclusion: "Bacillus spp."
        // also bacillus spp are penicillin resistant
      },
      {
        text: "Negative",
        nextStep: null,
        conclusion: "Bacillus anthracis"
        // also B anthracis is penicillin sensitive
      }
    ]
  },
  {
    id: "catalase-gpr",
    question: "Catalase",
    options: [
      {
        text: "Positive",
        nextStep: "motility-bile-esculin",
      },
      {
        text: "Negative",
        nextStep: "TSI"
      }
    ]
  },
  {
    id: "motility-bile-esculin",
    question:"Motility | Bile Esculin",
    options: [
      {
        text: "Positive",
        nextStep: null,
        conclusion: "Listeria"
        // all Listeria are catalase negative, can do a hint for L mono
      },
      {
        text: "Negative",
        nextStep: null,
        conclusion: "Corynebacterium"
        // hints for diphtheroids if possible
      }
    ]
  },
  {
    id: "TSI",
    question: "TSI Slant Result:",
    options: [
      {
        text: "A/A (Acid/Acid)",
        nextStep: "h2s-prod"
      },
      {
        text: "Other pattern",
        nextStep: null,
        conclusion: "Further testing required (not Lacto/Erysipelothrix)"
      }
    ]
  },
  {
    id: "h2s-prod",
    question: "H2S Production",
    options: [
      {
        text: "Positive",
        nextStep: null,
        conclusion: "Erysipelothrix"
      },
      {
        text: "Negative",
        nextStep: null,
        conclusion: "Lactobacillus"
      }
    ]
  }
];
