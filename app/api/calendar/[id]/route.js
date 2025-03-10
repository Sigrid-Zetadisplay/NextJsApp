import { dbConnect } from '@/lib/dbConnect';
import Appointment from '@/models/appointmentModel';

// PUT: Edit an existing appointment
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id } = params;

    const updated = await Appointment.findByIdAndUpdate(id, body, {
      new: true, // return the updated document
      runValidators: true,
    });

    if (!updated) {
      return new Response(JSON.stringify({ success: false, error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data: updated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE: Remove an appointment
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deleted = await Appointment.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ success: false, error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data: deleted }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
