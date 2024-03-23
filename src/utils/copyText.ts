const handleCopy = async (textToCopy:string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };




export default handleCopy;