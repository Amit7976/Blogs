import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

import React from "react";
function FaqSection() {
  const faqData = [
    {
      question: "Are there any charges for applying on jobs?",
      answer:
        "You will have to pay 30% of your first salary to JobBoost. No additional charges will be levied after this. Additionally, you are expected to maintain good behavior in the company, and you cannot change companies for at least 2 to 3 months due to our reputation.",
    },
    {
      question: "How can we contact the recruiters?",
      answer:
        "You can directly call the recruiters by clicking on the ‘Call’ button in the Job Description, which is active between 10 a.m. to 7 p.m. After these hours, you can apply for the job, and the recruiter will contact you if they find your application relevant.",
    },
    {
      question: "What should I do if I'm not satisfied with the job?",
      answer:
        "If you are not satisfied with the job, you can contact JobBoost recruiters by visiting the <a href='/contact' target='_blank' className='text-orange-500'>Contact Page</a>. They will provide you with the information and advice you need to make a decision.",
    },
    {
      question: "What if I'm not interested in the job?",
      answer:
        "You can remove your application from the job listing by clicking on the 'Remove' button. JobBoost will remove your application from the job listing and notify you of other job opportunities if needed.",
    },
    {
      question: "How can I get in touch with the company?",
      answer:
        "You can contact the company by clicking on the 'Contact' button in the Job Description, which is active between 10 a.m. to 7 p.m. After these hours, you can apply for the job, and the company will contact you if they find your application relevant.",
    },
    {
      question: "What type of jobs do you have?",
      answer:
        "We offer a variety of job opportunities, including full-time, part-time, freelance, and remote positions. We are constantly looking for talented individuals to join our team.",
    },
    {
      question: "How can I apply for a job?",
      answer:
        "You can apply for a job by clicking on the 'Apply Now' button and filling in the required information. We or the hiring company will review your application and contact you if your application is found relevant.",
    },
  ];

  return (
    <>
      <section className="my-20">
        <h2 className="text-3xl font-bold w-full text-center">
          Popular Questions
        </h2>

        <div className="max-w-3xl w-full mx-auto my-10 flex flex-col gap-4">
          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              className="border-2 py-1 px-5 rounded-xl"
            >
              <AccordionItem value={faq.question} className="border-none">
                <AccordionTrigger className="hover:no-underline font-semibold text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="bg-gray-50 p-2 rounded-md text-base font-medium text-gray-500">
                  <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </section>
    </>
  );
}

export default FaqSection;
