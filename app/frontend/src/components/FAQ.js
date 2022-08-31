import React from 'react'
import './CSS/FAQ.css';

export default function FAQ() {
  return (
    <div id="faq">
      <h1 id="titleFAQ">FAQ</h1>
      <div id='questionsAndAnswers'>
        <div id='question1'>
          <h2 className='questionsFAQ'>Why can I choose between two models?</h2>
          <p className='answersFAQ'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Imperdiet sed euismod nisi porta lorem mollis aliquam. Luctus venenatis lectus magna fringilla. 
            Volutpat commodo sed egestas egestas. Faucibus pulvinar elementum integer enim neque volutpat 
            ac tincidunt vitae. Auctor augue mauris augue neque gravida in fermentum et. Ridiculus mus mauris 
            vitae ultricies leo integer malesuada. Lacus sed viverra tellus in. Sit amet cursus sit amet. 
            Pulvinar pellentesque habitant morbi tristique senectus et. Morbi tristique senectus et netus. 
            Ultricies lacus sed turpis tincidunt id. Integer eget aliquet nibh praesent tristique magna sit 
            amet purus. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. 
            Congue eu consequat ac felis donec et.

            Urna condimentum mattis pellentesque id nibh tortor id. Justo eget magna fermentum iaculis 
            eu non. Amet est placerat in egestas erat imperdiet sed euismod nisi. Ac tortor vitae purus 
            faucibus ornare. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Eleifend donec 
            pretium vulputate sapien nec sagittis. Quis eleifend quam adipiscing vitae. Id donec ultrices tincidunt 
            arcu non. Tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris commodo quis 
            imperdiet massa tincidunt nunc pulvinar. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. 
            Quis lectus nulla at volutpat diam ut. Bibendum est ultricies integer quis auctor elit sed vulputate. 
            Magna sit amet purus gravida quis blandit turpis. Feugiat nisl pretium fusce id velit ut tortor pretium. 
            Sollicitudin tempor id eu nisl nunc.
          </p>
        </div>
        <div id='question2'>
          <h2 className='questionsFAQ'>What data can I find in the report?</h2>
          <p className='answersFAQ'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Imperdiet sed euismod nisi porta lorem mollis aliquam. Luctus venenatis lectus magna fringilla. 
            Volutpat commodo sed egestas egestas. Faucibus pulvinar elementum integer enim neque volutpat 
            ac tincidunt vitae. Auctor augue mauris augue neque gravida in fermentum et. Ridiculus mus mauris 
            vitae ultricies leo integer malesuada. Lacus sed viverra tellus in. Sit amet cursus sit amet. 
            Pulvinar pellentesque habitant morbi tristique senectus et. Morbi tristique senectus et netus. 
            Ultricies lacus sed turpis tincidunt id. Integer eget aliquet nibh praesent tristique magna sit 
            amet purus. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. 
            Congue eu consequat ac felis donec et.

            Urna condimentum mattis pellentesque id nibh tortor id. Justo eget magna fermentum iaculis 
            eu non. Amet est placerat in egestas erat imperdiet sed euismod nisi. Ac tortor vitae purus 
            faucibus ornare. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Eleifend donec 
            pretium vulputate sapien nec sagittis. Quis eleifend quam adipiscing vitae. Id donec ultrices tincidunt 
            arcu non. Tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris commodo quis 
            imperdiet massa tincidunt nunc pulvinar. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. 
            Quis lectus nulla at volutpat diam ut. Bibendum est ultricies integer quis auctor elit sed vulputate. 
            Magna sit amet purus gravida quis blandit turpis. Feugiat nisl pretium fusce id velit ut tortor pretium. 
            Sollicitudin tempor id eu nisl nunc.
          </p>
        </div>
        <div id='question3'>
          <h2 className='questionsFAQ'>Why do I need to evaluate my project?</h2>
          <p className='answersFAQ'>Also AI systems are impressively good today, they might not analyse
            your images perfectly. To ensure your images will be analysed better,
            we would like you to evaluate the process. Dependent on how many images you have
            uploaded the evaluation process might take a few minutes. We developed the interface
            in a easy-to-use manner for this purpose.
          </p>
        </div>
        <div id='question4'>
          <h2 className='questionsFAQ'>Can I use VESSEG for other use cases in other fields?</h2>
          <p className='answersFAQ'>At the moment it is not possible to use VESSEG for any other use cases
            outside of atheroslerosis data. But it is planned in the future. If you
            would like to use VESSEG for your clinical case contact us 
            <a href='/impressum' style={{textDecoration: 'none'}}> here</a> for more information.
          </p>
        </div>
      </div>
    </div>
  )
}
