import React from 'react'
import './CSS/About.css'

export default function About() {
  return (
    <div className='about'>
      <h1>This is vesseg, a tool to speed up atherosclerosis research.</h1>
      <div className='vesseg'>
        <p>
        Its is being developed by the Computational Radiology Group at the German Cancer Research Center (DKFZ) in Heidelberg, Germany, <br/>
        in collaboration with the Research Group for Perioperative Vascular Biology at the Clinic for Anaesthesiology <br/>
        at the University Hospital Heidelberg and the Institute for Artificial Intelligence in Medicine (IKIM) at the University Hospital Essen. <br/>
        <br/>
        The current models are based on the following two U-Net-based segmentation pipelines: <br/>
          <ol>
            <li>Fabian Isensee, Paul F. Jäger, Simon A. A. Kohl, Jens Petersen, Klaus H. Maier-Hein: <br/> 
              <a href="https://arxiv.org/abs/1904.08128">Automated Design of Deep Learning Methods for Biomedical Image Segmentation</a> arXiv preprint arXiv:1904.08128 (2020).</li>
            <li>Howard, Jeremy, and Sylvain Gugger: <br/>
              <a href="https://arxiv.org/abs/2002.04688">Fastai: A Layered API for Deep Learning</a>. Information 11.2 (2020): 108. Crossref. Web.</li>
          </ol> 
        </p>
      </div>
      <div className='radiomics'>
        <h1>The radiomics pipeline</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  )
}
