const URL = `${process.env.NEXT_PUBLIC_API_URL}/newsletter`;

const subscribeNewsletter = async (email: string) => {
  const res = await fetch(`${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  return data;
};

export default subscribeNewsletter;
