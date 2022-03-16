import styled from 'styled-components'

const Copyright = ({ className }: { className?: string }) => (
  <div className={className}>
    <span>© Copyright 2022. copotrzebne</span>
  </div>
)

export default styled(Copyright)`
  width: 100%;
  height: 24px;
  background-color: #dedede;
  color: #999999;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
`
