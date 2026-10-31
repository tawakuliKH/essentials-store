
const questions = [
  {
    question: "What can I find in store?",
    answer:
      "We sell kitchenware, pots, cutlery, pressure cookers, DIY tools, nails, screws, paint, stationery, toys and everyday household items.",
  },
  {
    question:
      "Can I check whether an item is available?",
    answer:
      "Yes. Call 0113 318 3271 or message us on WhatsApp at 07466 353588 to ask about current availability and prices before visiting.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Delivery can be arranged for selected items, depending on the delivery address and order amount. Contact our team to discuss your items and confirm the arrangements and any charges.",
  },
  {
    question: "Can I buy through this website?",
    answer:
      "Online checkout is not currently available. Visit our Leeds store to shop, or contact us with product and delivery enquiries.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We open Monday to Saturday from 10 AM to 8 PM, and Sunday from 10 AM to 7 PM, Leeds local time. Please call ahead for bank holiday hours.",
  },
  {
    question:
      "Who should I contact about returns or warranties?",
    answer:
      "Please contact our team with the item and purchase details. Electrical warranties are available on selected items only, with coverage confirmed at purchase. Our team can explain the applicable conditions and review faulty-item or return enquiries.",
  },
];

export default function FAQ() {
  return (
    <section
      className="faq-section container"
      id="questions"
      aria-labelledby="faq-title"
    >
      <div>
        <p className="eyebrow">
          GOOD TO KNOW
        </p>

        <h2 id="faq-title">
          A few useful answers.
        </h2>

        <p>
          Need something else?
          <br />

          <a
            className="text-link"
            href="tel:+441133183271"
          >
            Give Us a Call
            <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>

      <div className="faq-list">
        {questions.map(({ question, answer }) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>

            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}