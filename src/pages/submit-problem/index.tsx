import { useState } from 'react';
import { Problem, Example } from '../../utils/types/problemTypes'; // Assuming you export these types from the correct location

const SubmitProblem = () => {
  const [formData, setFormData] = useState<Problem>({
    title: '',
    problemStatement: '',
    examples: [],
    constraints: '',
    starterCode: '',
    handlerFunction: '',
    order: 1,
    starterFunctionName: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for examples (which is an array)
  const handleExampleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const newExamples = [...formData.examples];
    newExamples[index] = { ...newExamples[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      examples: newExamples,
    }));
  };

  // Add a new example to the list
  const addExample = () => {
    setFormData((prevData) => ({
      ...prevData,
      examples: [
        ...prevData.examples,
        { id: prevData.examples.length + 1, inputText: '', outputText: '', explanation: '', img: '' },
      ],
    }));
  };

  // Remove an example by index
  const removeExample = (index: number) => {
    const newExamples = formData.examples.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      examples: newExamples,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Problem submitted successfully');
      } else {
        alert('Error submitting problem');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting problem');
    }
  };

  return (
    <div className="bg-dark-layer-1 text-dark-label-2 p-6 rounded-lg">
      <h1 className="text-3xl font-semibold text-brand-orange mb-6">Submit Problem to Database</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic fields */}
        {/* <div>
          <label className="block text-dark-gray-7">Problem ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
          />
        </div> */}

        <div>
          <label className="block text-dark-gray-7">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
          />
        </div>

        <div>
          <label className="block text-dark-gray-7">Problem Statement:</label>
          <textarea
            name="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
          />
        </div>

        <div>
          <label className="block text-dark-gray-7">Constraints:</label>
          <textarea
            name="constraints"
            value={formData.constraints}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
          />
        </div>

        <div>
          <label className="block text-dark-gray-7">Starter Code:</label>
          <textarea
            name="starterCode"
            value={formData.starterCode}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
          />
        </div>

        <div>
          <label className="block text-dark-gray-7">Handler Function (JavaScript code):</label>
          <textarea
            name="handlerFunction"
            value={formData.handlerFunction}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
          />
        </div>

        <div>
          <label className="block text-dark-gray-7">Order (Numeric):</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
          />
        </div>

        <div>
          <label className="block text-dark-gray-7">Starter Function Name:</label>
          <input
            type="text"
            name="starterFunctionName"
            value={formData.starterFunctionName}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
          />
        </div>

        {/* Handling Multiple Examples */}
        <div>
          <label className="block text-dark-gray-7">Examples:</label>
          {formData.examples.map((example, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-dark-yellow font-semibold">Example {index + 1}</h3>

              <div>
                <label className="block text-dark-gray-7">Input Text:</label>
                <input
                  type="text"
                  name="inputText"
                  value={example.inputText}
                  onChange={(e) => handleExampleChange(e, index)}
                  required
                  className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
                />
              </div>

              <div>
                <label className="block text-dark-gray-7">Output Text:</label>
                <input
                  type="text"
                  name="outputText"
                  value={example.outputText}
                  onChange={(e) => handleExampleChange(e, index)}
                  required
                  className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
                />
              </div>

              <div>
                <label className="block text-dark-gray-7">Explanation:</label>
                <textarea
                  name="explanation"
                  value={example.explanation || ''}
                  onChange={(e) => handleExampleChange(e, index)}
                  className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
                />
              </div>

              <div>
                <label className="block text-dark-gray-7">Image URL (optional):</label>
                <input
                  type="text"
                  name="img"
                  value={example.img || ''}
                  onChange={(e) => handleExampleChange(e, index)}
                  className="w-full p-2 mt-2 rounded-md bg-dark-fill-2 text-dark-gray-8 border border-dark-divider-border-2"
                />
              </div>

              <button
                type="button"
                onClick={() => removeExample(index)}
                className="text-dark-pink hover:text-dark-pink font-semibold"
              >
                Remove Example
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addExample}
            className="bg-dark-green-s hover:bg-dark-green-s text-white px-4 py-2 rounded-md mt-4"
          >
            Add Example
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-dark-blue-s hover:bg-dark-blue-s text-white px-6 py-3 rounded-lg mt-6"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitProblem;
