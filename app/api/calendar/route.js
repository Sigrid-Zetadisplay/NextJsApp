import { dbConnect } from '@/lib/dbConnect';
import Appointment from '@/models/appointmentModel';

export async function GET() {
  try {
    await dbConnect();
    const appointments = await Appointment.find({});
    return new Response(JSON.stringify({ success: true, data: appointments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newAppointment = await Appointment.create(body);
    return new Response(JSON.stringify({ success: true, data: newAppointment }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
