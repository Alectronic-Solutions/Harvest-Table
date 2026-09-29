// Guest questions answered on /reservations. Also emitted as FAQPage schema,
// so every answer here must match how the restaurant actually operates.

export type Faq = { question: string; answer: string }

export const RESERVATION_FAQS: Faq[] = [
  {
    question: "How far ahead can I book?",
    answer:
      "Reservations open 30 days in advance. Friday and Saturday evenings usually fill a week or two out, so plan ahead for weekends.",
  },
  {
    question: "Do you take walk-ins?",
    answer:
      "Yes. We hold the six seats at the bar and two small tables for walk-ins every night, first come, first served.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Please give us 24 hours notice. For parties of six or more we ask for 48 hours, since we buy produce for each night's covers.",
  },
  {
    question: "Can you accommodate allergies and dietary needs?",
    answer:
      "Almost always. Tell us when you reserve and the kitchen will plan for it. Every dish is marked vegetarian, vegan, or gluten-free where it applies.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "No. Come as you are. Most guests land somewhere between work clothes and a nice dinner out.",
  },
  {
    question: "Are children welcome?",
    answer:
      "Yes. We have high chairs and a small plate of whatever is simplest that night for younger guests. Sunday brunch is the most kid-friendly service.",
  },
  {
    question: "Where do I park?",
    answer:
      "Free street parking is available on Main Street after 5 pm, and the public lot on Sacramento Street is a two-minute walk.",
  },
]
