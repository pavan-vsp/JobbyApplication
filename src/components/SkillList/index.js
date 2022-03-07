import './index.css'

const SkillList = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails

  return (
    <li className="skills">
      <img src={imageUrl} alt={`${name}`} className="skillImage" />
      <p className="skillName">{name}</p>
    </li>
  )
}

export default SkillList
