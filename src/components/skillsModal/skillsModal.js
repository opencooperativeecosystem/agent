import React from "react";
import style from "./style.css";
import { Icons } from "oce-components/build";

export default ({skills}) => {
  return (
  <div className={style.info_skills}>
    <h4 className={style.skills_title}>
    <span><Icons.Star width="18" height="18" color="#3B99FC" /></span>
    All your skills
    </h4>
    <div>
      {skills.map((skill, i) => (
        <div className={style.skill_item} key={i}>
        {skill.name}
        </div>
      ))}
    </div>
  </div>
)}


{/* // const SkillsModal = ({ skills }) => (
//   <div className={style.info_skills}>
//     <h4 className={style.skills_title}>
//       <span>
//         <Icons.Star width="18" height="18" color="#3B99FC" />
//       </span>
//       All your skills
//     </h4>
//     <div className={style.skills}>
//       {skills.map((skill, i) => (
//         <div className={style.skill_item} key={i}>
//           {skill.name}
//         </div>
//       ))}
//     </div>
//   </div>
// ); */}

// export default SkillsModal;
