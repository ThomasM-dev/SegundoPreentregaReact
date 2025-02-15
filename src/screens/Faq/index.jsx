import React from "react";
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import "./Faq.css";


const Faq = () => {
  return (
    <>
      <div className="faq-page">
        <h2 className="faq-title">Preguntas Frecuentes</h2>
        <CAccordion activeItemKey={0}>
          <CAccordionItem itemKey={0}>
            <CAccordionHeader>¿Qué es Lorem Ipsum?</CAccordionHeader>
            <CAccordionBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>¿Por qué usamos Lorem Ipsum?</CAccordionHeader>
            <CAccordionBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={2}>
            <CAccordionHeader>¿De dónde viene?</CAccordionHeader>
            <CAccordionBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={3}>
            <CAccordionHeader>¿Dónde puedo conseguirlo?</CAccordionHeader>
            <CAccordionBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={4}>
            <CAccordionHeader>¿Es seguro usar Lorem Ipsum?</CAccordionHeader>
            <CAccordionBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={5}>
            <CAccordionHeader>¿Cuáles son las alternativas?</CAccordionHeader>
            <CAccordionBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>
    </>
  );
};

export default Faq;
