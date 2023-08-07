const API = "http://localhost:3000/categoria";

export const deleteTask = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};

export const getCategorias = async () => {
  const res = await fetch(API, {
    method: "GET",
  });

  return await res.json();
};

