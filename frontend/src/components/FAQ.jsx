import Accordion from "react-bootstrap/Accordion";
import { faqList } from "../utils/faqList";

function FAQs() {
  return (
    <Accordion defaultActiveKey="0" alwaysOpen>
      {faqList.map((faq, index) => (
        <>
          <Accordion.Item eventKey={index}>
            <Accordion.Header>{faq.question}</Accordion.Header>
            <Accordion.Body className="bg-gray-200">
              {faq.answer}{" "}
            </Accordion.Body>
          </Accordion.Item>
          <br />
        </>
      ))}
    </Accordion>
  );
}

export default FAQs;
