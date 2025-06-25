import React, { useState } from 'react'; 
import { FaMinus, FaPlus } from 'react-icons/fa';
import Each from '../layouts/Each';


interface FAQItemProps{
    index: number;
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: VoidFunction;
}

const FAQItem = ({index, question, answer, isOpen, onToggle }: FAQItemProps) => {
    return (
        <div className={`border-b border-light-300 pb-6 md:pb-8 ${index === 0 ? "md:pt-4" : "pt-6 md:pt-8"} `}>
            <button
                className="w-full flex justify-between items-center text-left"
                onClick={onToggle}
            >
                <span  style={{ fontWeight: 'bold' }} className={`text-lg text-heading`}>{question}</span>
                {isOpen ? (
                    <FaMinus className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                    <FaPlus className="w-5 h-5 text-primary flex-shrink-0" />
                )}
            </button>
            
            {isOpen && (
                <div className="text-sub-heading mt-4 md:text-content-2 text-content-1">
                    {answer}
                </div>
            )}
        </div>
    );
};

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [ {
            question: 'Thiệp cưới Online của Huy Thanh có miễn phí không?',
            answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massanah. Cum sociis Theme natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
        }, {
            question: 'Can I change my plan later?',
            answer: 'Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.'
        }, {
            question: 'What is your cancellation policy?',
            answer: 'We offer a flexible cancellation policy. You can cancel your subscription at any time through your account settings.'
        }, {
            question: 'How do I change my account email?',
            answer: "You can update your email address in your account settings. We'll send a confirmation link to both your old and new email addresses."
    } ];

    return (
        <section className="max-w-9xl mx-auto full:px-default py-16 px-[15px] sm:p-5 full:py-[130px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-11 lg:space-x-[139px]">
                {/* Left Column - Title & Description */}
                <div className='col-span-1'>
                    <h2 className="text-[28px] leading-[42px] md:text-[36px] md:leading-[54px] md:text-title font-bold mb-3 top-0 bg-white text-heading">Câu hỏi thường gặp</h2>
                    <p className="text-sub-heading md:text-content-2 text-content-1">
                        Thiệp cưới online miễn phí từ Huy Thanh với thao tác đơn giản, giúp bạn dễ dàng quản lý khách mời và tạo dấu ấn cá nhân cho ngày cưới thêm trọn vẹn!
                    </p>
                </div>

                {/* Right Column - FAQ Items */}
                <div className="md:col-span-2">
                    <Each 
                        of={faqs}
                        render={(faq, index) => (
                            <FAQItem
                                index={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={index === openIndex}
                                onToggle={() => setOpenIndex(index === openIndex ? -1 : index)}
                            />
                        )}
                    /> 
                </div>
            </div>
        </section>
    );
};

export default FAQSection;